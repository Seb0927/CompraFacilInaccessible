import { Background } from '../components';

const Page = ({ children }) => {
  return (
    <Background>
      {children}
    </Background>
  );
};

export default Page;