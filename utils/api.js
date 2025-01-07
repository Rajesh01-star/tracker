const API_KEY = process.env.NEXT_PUBLIC_Firebasekey;

export async function updateProfile(token, name, iconURL) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
        displayName: name,
        photoUrl: iconURL,
        returnSecureToken: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error.message);
  }
  return response.json();
}

export async function getUserData(token) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({ idToken: token }),
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  return response.json();
}

export async function verifyEmail(token) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: token,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  return response.json();
}

export async function postExpense(amount, description, category) {
  const response = await fetch(
    "https://tracker-68f00-default-rtdb.firebaseio.com/expenses.json",
    {
      method: "POST",
      body: JSON.stringify({
        price: amount,
        category: category,
        description: description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
}

export async function getExpenseList() {
  try {
    const response = await fetch(
      "https://tracker-68f00-default-rtdb.firebaseio.com/expenses.json"
    );

    if (!response.ok) {
      throw new Error(`Error fetching expenses: ${response.statusText}`);
    }

    const result = await response.json();

    if (result && typeof result === "object") {
      return Object.entries(result).map(([id, details]) => ({
        id,
        ...details,
      }));
    } else {
      console.warn("Unexpected data format received from API:", result);
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch expense list:", error);
    return [];
  }
}

export async function editListItem(id, updatedExpense) {
  try {
    const response = await fetch(
      `https://tracker-68f00-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedExpense),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update expense");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to edit expense item:", error);
    throw error;
  }
}

export async function deleteListItem(id) {
  try {
    const response = await fetch(
      `https://tracker-68f00-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete the expense item");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Failed to delte the expense item:", error);
    throw error;
  }
}
