import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
      minTimeout: 10,
    });

    async function fetchStatusPage(bail, tryNumber) {
      console.log(tryNumber);
      const res = await fetch("http://localhost:3000/api/v1/status");
      const resBody = await res.json();
    }
  }
}

export default {
  waitForAllServices,
};
