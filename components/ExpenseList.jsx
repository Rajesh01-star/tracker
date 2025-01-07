import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ExpenseList({ expenses, onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});

  function handleEdit(expense) {
    setEditingId(expense.id);
    setEditedExpense(expense);
  }

  function handleSave() {
    onEdit(editedExpense);
    setEditingId(null);
  }

  function handleCancel() {
    setEditingId(null);
    setEditedExpense({});
  }

  function handleChange(field, value) {
    setEditedExpense((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Expense List</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses available. Add some!</p>
      ) : (
        expenses.map((expense) => (
          <Card key={expense.id} className="mb-4">
            <CardContent className="flex justify-between items-center p-4">
              {editingId === expense.id ? (
                <>
                  <div className="flex-grow mr-4">
                    <Input
                      value={editedExpense.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                      className="mb-2"
                      placeholder="Description"
                    />
                    <Select
                      value={editedExpense.category}
                      onValueChange={(value) => handleChange("category", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Food">Food</SelectItem>
                        <SelectItem value="Petrol">Petrol</SelectItem>
                        <SelectItem value="Salary">Salary</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={editedExpense.price}
                      onChange={(e) => handleChange("price", e.target.value)}
                      className="mt-2"
                      placeholder="Price"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>Save</Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="font-semibold">{expense.description}</p>
                    <p className="text-sm text-gray-500">{expense.category}</p>
                  </div>
                  <p className="text-lg font-bold">₹{expense.price}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleEdit(expense)}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => onDelete(expense.id)}>Delete</Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
