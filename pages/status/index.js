import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  return (
    <>
      <h1>Status</h1>
      <UpdatedAt isLoading={isLoading} data={data} />
      <MaxConnections isLoading={isLoading} data={data} />
      <Version isLoading={isLoading} data={data} />
      <OpenedConnections isLoading={isLoading} data={data} />
    </>
  );
}

function UpdatedAt({ isLoading, data }) {
  let UpdatedAtText = "Carregando...";

  if (!isLoading && data) {
    UpdatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {UpdatedAtText}</div>;
}

function MaxConnections({ isLoading, data }) {
  let maxConnectionsText = "0";

  if (!isLoading && data) {
    maxConnectionsText = data?.dependencies?.database?.max_connections;
  }

  return <div>Máximo de conexões: {maxConnectionsText}</div>;
}

function Version({ isLoading, data }) {
  let versionText = "1.0.0";

  if (!isLoading && data) {
    versionText = data?.dependencies?.database?.version;
  }

  return <div>Versão: {versionText}</div>;
}

function OpenedConnections({ isLoading, data }) {
  let openedConnectionsText = "0";

  if (!isLoading && data) {
    openedConnectionsText = data?.dependencies?.database?.opened_connections;
  }

  return <div>Conexões abertas: {openedConnectionsText}</div>;
}
