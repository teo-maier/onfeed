export interface CollapsedProps {
  children: React.ReactNode;
}

const Collapsed: React.FC<CollapsedProps> = ({ children }) => (
  <div style={styles}>{children}</div>
);

const styles = {
  color: '#007bff', // blue
  background: 'rgba(0, 0, 0, 0.075)', // gray
  padding: '15px 15px',
};

export default Collapsed;
