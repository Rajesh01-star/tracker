"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GithubIcon, WholeWordIcon } from "lucide-react";
import React, { useState } from "react";

function Welcom() {
  const [completeTabOpen, setCompleteTabOpen] = useState(false);
  const [name, setName] = useState("");
  const [iconURL, setIconURL] = useState("");

  async function handleUpdateClick() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("idToken");

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
        alert("profile updated!!!");
      } else {
        const data = await response.json();
        setAlertMessage(`Error: ${data.error.message}`);
        setAlertVisible(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="flex flex-col mx-10">
      <div className="flex justify-around p-4">
        <div>Welcom to the Expense Tracker</div>
        <div className=" w-96">
          {completeTabOpen
            ? "Your Profile is 64% complete. A complete profile has higher chances of getting a job:"
            : "Your profile is incomplete:"}
          <span
            onClick={() => setCompleteTabOpen((prevState) => !prevState)}
            className="text-blue-800 cursor-pointer"
          >
            {"  "}Complete Now
          </span>
        </div>
      </div>
      {completeTabOpen && (
        <div className="w-[50%] border-b-[1px] border-black p-4 self-end">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Contact Details</h2>
            <Button
              onClick={() => setCompleteTabOpen((prevState) => !prevState)}
              variant="destructive"
            >
              cancel
            </Button>
          </div>
          <section className="flex gap-10 m-2">
            <div className="flex gap-2 justify-center items-center basis-1/2">
              <GithubIcon />
              <Label className=" text-lg" htmlFor="name">
                FullName
              </Label>
              <Input
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="flex gap-2 justify-center items-center basis-1/2">
              <WholeWordIcon />
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
    </section>
  );
}

export default Welcom;
