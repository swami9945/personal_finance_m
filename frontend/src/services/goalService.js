import api from "./api";

export async function getGoals() {
  const response = await api.get("/goals");
  return response.data;
}

export async function createGoal(payload) {
  const response = await api.post("/goals", payload);
  return response.data;
}

export async function updateGoal(id, payload) {
  const response = await api.put(`/goals/${id}`, payload);
  return response.data;
}
export async function deleteGoal(id) {
  await api.delete(`/goals/${id}`);
}
