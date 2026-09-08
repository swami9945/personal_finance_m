import api from "./api";

export async function getRecurring() {
  const response = await api.get("/recurring");
  return response.data;
}
export async function createRecurring(payload) {
  const response = await api.post("/recurring", payload);
  return response.data;
}
export async function updateRecurring(id, payload) {
  const response = await api.put(`/recurring/${id}`, payload);
  return response.data;
}
export async function deleteRecurring(id) {
  await api.delete(`/recurring/${id}`);
}
