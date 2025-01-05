"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Welcom() {
  const [completeTabOpen, setCompleteTabOpen] = useState(false);
  const [name, setName] = useState("");
  const [iconURL, setIconURL] = useState("");
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [token, setToken] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("idToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.warn("No token found in localStorage.");
    }
  }, []);

  async function handleUpdateClick() {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.NEXT_PUBLIC_Firebasekey}`,
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
      if (response.ok) {
        setProfileCompleted(true);
        setCompleteTabOpen(false);
      } else {
        const data = await response.json();
        console.error(`Error: ${data.error.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getUserData() {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_Firebasekey}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleVerifyClick() {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.NEXT_PUBLIC_Firebasekey}`,
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
      const result = await response.json();
      console.log(result);
    } catch (err) {
      alert(err.message);
    }
  }

  function handleLogoutBtn() {
    localStorage.removeItem("idToken");
    setToken("");
  }

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [profileCompleted, token]);

  const message = profileCompleted
    ? "Your profile is complete."
    : completeTabOpen
    ? "Your Profile is 64% complete. A complete profile has higher chances of getting a job:"
    : "Your profile is incomplete:";

  const handleSubmitExpense = (e) => {
    e.preventDefault();
    if (!amount || !description || !category) return;

    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      description,
      category
    };

    setExpenses([newExpense, ...expenses]);
    setAmount('');
    setDescription('');
    setCategory('');
  };

  return (
    <section className="flex flex-col mx-10">
      <div className="flex justify-around p-4">
        <div>Welcome to the Expense Tracker</div>
        <div className="w-96">
          {message}
          <span
            onClick={() => setCompleteTabOpen((prevState) => !prevState)}
            className="text-blue-800 cursor-pointer"
          >
            {!profileCompleted && "Complete Now"}
          </span>
        </div>
      </div>
      {profileCompleted && (
        <section className="flex justify-between">
          <>
            <Button onClick={handleVerifyClick}>Verify Email</Button>
          </>
          <>
            <Button onClick={handleLogoutBtn}>Log out</Button>
          </>
        </section>
      )}
      {completeTabOpen && (
        <div className="w-[50%] border-b-[1px] border-black p-4 self-end">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Contact Details</h2>
            <Button
              onClick={() => setCompleteTabOpen((prevState) => !prevState)}
              variant="destructive"
            >
              Cancel
            </Button>
          </div>
          <section className="flex gap-10 m-2">
            <div className="flex gap-2 justify-center items-center basis-1/2">
              <Label className="text-lg" htmlFor="name">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="flex gap-2 justify-center items-center basis-1/2">
              <Label className="text-lg whitespace-nowrap" htmlFor="url">
                Picture URL
              </Label>
              <Input
                id="url"
                type="text"
                onChange={(e) => setIconURL(e.target.value)}
                value={iconURL}
              />
            </div>
          </section>
          <Button onClick={handleUpdateClick} type="submit">
            Update
          </Button>
        </div>
      )}
      {token && (
        <div className="mt-8 w-[30%] m-auto">
          <Card className="">
            <CardHeader>
              <CardTitle>Add Daily Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitExpense} className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount Spent</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Amount Spent"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Salary">Salary</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">Add Expense</Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Expense List</h2>
            {expenses.map((expense) => (
              <Card key={expense.id} className="mb-4">
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <p className="font-semibold">{expense.description}</p>
                    <p className="text-sm text-gray-500">{expense.category}</p>
                  </div>
                  <p className="text-lg font-bold">${expense.amount.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Welcom;

