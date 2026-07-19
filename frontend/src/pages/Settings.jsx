import { useState } from "react";
import { useAuth } from "@/lib/auth";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";

export default function Settings() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [model, setModel] = useState(user?.default_model || "OpenRouter AI Model");

  const save = async () => {
    try {
      await api.put("/auth/profile", { name, default_model: model });
      const u = { ...user, name, default_model: model };
      localStorage.setItem("tl_user", JSON.stringify(u));
      toast.success("Saved");
    } catch { toast.error("Failed"); }
  };

  return (
    <div className="space-y-6 max-w-2xl" data-testid="settings-page">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] font-bold text-blue-600 mb-2">Settings</div>
        <h1 className="font-display text-4xl font-semibold tracking-tight">Preferences</h1>
      </div>

      <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-5">
        <div>
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 h-11 rounded-xl" data-testid="settings-name" />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={user?.email || ""} disabled className="mt-1.5 h-11 rounded-xl bg-slate-50" />
        </div>
        <div>
          <Label>Default AI Model</Label>
          <Select value={model} onValueChange={setModel}><SelectTrigger
            className="mt-1.5 h-11 rounded-xl"
            data-testid="settings-model"
          >
            <SelectValue placeholder="Select AI Model" />
          </SelectTrigger>

            <SelectContent>
              <SelectItem value="deepseek/deepseek-chat-v3-0324">
                DeepSeek Chat V3
              </SelectItem>

              <SelectItem value="qwen/qwen3-32b">
                Qwen 3 32B
              </SelectItem>

              <SelectItem value="meta-llama/llama-3.3-70b-instruct">
                Llama 3.3 70B
              </SelectItem>

              <SelectItem value="mistralai/mistral-small-3.2-24b-instruct">
                Mistral Small 3
              </SelectItem>

              <SelectItem value="google/gemma-3-27b-it">
                Gemma 3 27B
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={save} className="bg-blue-600 h-11 rounded-xl" data-testid="settings-save-btn">Save changes</Button>
      </div>
    </div>
  );
}
