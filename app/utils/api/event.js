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

export async function getVendorEventDetails(userId, eventId) {
  const response = await fetch(
    apiUrl + "/event/details/" + userId + "/" + eventId,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const data = await response.json();
  return data;
}

export async function vendorPriceSubmit(request) {
  const response = await fetch(apiUrl + "/event/post/vendor/comparisions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  const data = await response.json();
  return data;
}

export async function changeStatusCounterPrice(request) {
  const response = await fetch(
    apiUrl + "/event/vendor/counter-price/status/change",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    }
  );

  const data = await response.json();
  return data;
}
