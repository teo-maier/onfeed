interface ExpandedProps {
  children: React.ReactNode;
}

const Expanded: React.FC<ExpandedProps> = ({ children }) => {
  return <div style={styles}>{children}</div>;
};

const styles = {
  padding: '15px',
};

export default Expanded;
