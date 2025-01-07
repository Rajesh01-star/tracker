import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { postExpense } from "@/utils/api";

export function ExpenseForm({ onExpenseAdded }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmitExpense = async (e) => {
    e.preventDefault();
    if (!amount || !description || !category) return;

    await postExpense(parseFloat(amount), description, category);
    setAmount("");
    setDescription("");
    setCategory("");
    onExpenseAdded();
  };

  return (
    <Card>
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
          <Button type="submit" className="w-full">
            Add Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

