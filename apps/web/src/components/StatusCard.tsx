type StatusCardProps = {
  service: string;
  status: string;
  timestamp: string;
};

function StatusCard({
  service,
  status,
  timestamp,
}: StatusCardProps) {
  return (
    <div className="status-card">
      <h3>{service}</h3>
      <p>Status: {status}</p>
      <p>Last checked: {timestamp}</p>
    </div>
  );
}

export default StatusCard;