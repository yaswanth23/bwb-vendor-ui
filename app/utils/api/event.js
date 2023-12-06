const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getEventsCount(userId) {
  const response = await fetch(apiUrl + "/event/count/vendor/" + userId, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  return data;
}

export async function getEvents(userId, status) {
  const response = await fetch(
    apiUrl + "/event/list?userId=" + userId + "&status=" + status,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const data = await response.json();
  return data;
}
