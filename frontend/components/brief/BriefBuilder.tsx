"use client";

import { useState } from "react";
import { BriefForm } from "@/components/brief/BriefForm";
import { BriefPreview } from "@/components/brief/BriefPreview";

export function BriefBuilder() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Beauty & skincare");
  const [budget, setBudget] = useState("$2,500 – $5,000");
  return <div className="brief-layout"><BriefForm title={title} setTitle={setTitle} description={description} setDescription={setDescription} category={category} setCategory={setCategory} budget={budget} setBudget={setBudget}/><BriefPreview title={title} description={description} category={category} budget={budget}/></div>;
}
