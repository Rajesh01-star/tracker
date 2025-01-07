import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile, verifyEmail } from "@/utils/api";

export function ProfileSection({ token, onProfileComplete, onLogout }) {
  const [completeTabOpen, setCompleteTabOpen] = useState(false);
  const [name, setName] = useState("");
  const [iconURL, setIconURL] = useState("");
  const [profileCompleted, setProfileCompleted] = useState(false);

  async function handleUpdateClick() {
    try {
      await updateProfile(token, name, iconURL);
      setProfileCompleted(true);
      setCompleteTabOpen(false);
      onProfileComplete();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleVerifyClick() {
    try {
      await verifyEmail(token);
    } catch (err) {
      alert(err.message);
    }
  }

  const message = profileCompleted
    ? "Your profile is complete."
    : completeTabOpen
    ? "Your Profile is 64% complete. A complete profile has higher chances of getting a job:"
    : "Your profile is incomplete:";

  return (
    <div>
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
          <Button onClick={handleVerifyClick}>Verify Email</Button>
          <Button onClick={onLogout}>Log out</Button>
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
    </div>
  );
}
