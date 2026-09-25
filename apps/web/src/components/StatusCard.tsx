type StatusCardProps = {
  name: string;
  url: string;
  status: string;
  responseTime: number | null;
};

function StatusCard({
  name,
  url,
  status,
  responseTime,
}: StatusCardProps) {
  return (
    <div className="status-card">
      <h3>{name}</h3>

      <p>{status === 'online' ? '🟢 Online' : '🔴 Offline'}</p>

      <p>{url}</p>

      <p>
        Response time:{' '}
        {responseTime !== null ? `${responseTime} ms` : 'Unavailable'}
      </p>
    </div>
  );
}

export default StatusCard;