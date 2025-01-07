"use client";
import React, { useState, useEffect } from "react";
import { ProfileSection } from "@/components/ProfileSection";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import {
  getUserData,
  getExpenseList,
  editListItem,
  deleteListItem,
} from "@/utils/api";

function Welcome() {
  const [token, setToken] = useState("");
  const [expenses, setExpenses] = useState([]);

  // Load token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("idToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.warn("No token found in localStorage.");
    }
  }, []);

  // Fetch user data when token is available
  useEffect(() => {
    if (token) {
      getUserData(token).catch((error) =>
        console.error("Failed to fetch user data:", error)
      );
    }
  }, [token]);

  // Fetch expense list on initial render and when the token changes
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenseList();
        setExpenses(data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    if (token) {
      fetchExpenses();
    }
  }, [token]);

  // Handle logout
  function handleLogout() {
    localStorage.removeItem("idToken");
    setToken("");
  }

  // Handle adding new expense
  async function handleExpenseAdded() {
    console.log("Expense added, refreshing list...");
    try {
      const data = await getExpenseList();
      setExpenses(data);
    } catch (error) {
      console.error("Failed to refresh expense list:", error);
    }
  }

  async function handleEdit(updatedExpense) {
    try {
      await editListItem(updatedExpense.id, updatedExpense);
      // After successful edit, update the local state
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        )
      );
    } catch (error) {
      console.error("Failed to edit expense:", error);
      // Handle error (e.g., show an error message to the user)
    }
  }

  async function handleDelete(id) {
    // Implement delete logic here
    const data = await deleteListItem(id);
    console.log(data);

    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  }

  return (
    <section className="flex flex-col mx-10">
      <ProfileSection
        token={token}
        onProfileComplete={() => console.log("Profile completed")}
        onLogout={handleLogout}
      />
      {token && (
        <div className="mt-8 w-[500px] m-auto">
          <ExpenseForm onExpenseAdded={handleExpenseAdded} />
          <ExpenseList
            expenses={expenses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </section>
  );
}

export default Welcome;
