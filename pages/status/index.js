import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdateAt />
      <h1>Database</h1>
      <DataBaseStatus />
    </>
  );
}

function UpdateAt() {
  const loading = Loading();

  let updateAtText = "Carregando ...";

  if (!loading.isLoading && loading.data) {
    updateAtText = new Date(loading.data.update_at).toLocaleString("pt-BR");
  }
  return <div>Últma atualização:{updateAtText}</div>;
}

function DataBaseStatus() {
  const loading = Loading();

  let dataBaseStatusInformation = "Carregando ...";

  if (!loading.isLoading && loading.data) {
    dataBaseStatusInformation = (
      <>
        <div> Versão: {loading.data.dependecies.database.version}</div>
        <div>
          Máximo de conexão: {loading.data.dependecies.database.max_connections}
        </div>
        <div>
          Conexões abertas:
          {loading.data.dependecies.database.opned_connections}
        </div>
      </>
    );
  }
  return <div>{dataBaseStatusInformation}</div>;
}

function Loading() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  return { isLoading, data };
}
