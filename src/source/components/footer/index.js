import { Layout } from 'antd';

export const Footer = () => {

  const year = new Date().getFullYear();

  return (
    <Layout.Footer style={{ textAlign: 'center' }}>films-app ©{year}</Layout.Footer>
  );
};
