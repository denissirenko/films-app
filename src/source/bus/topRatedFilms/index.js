import { Link } from 'react-router-dom';
import { Table, Image } from 'antd';
import "antd/dist/antd.css";
import { useTopRatedFilms } from './customHooks/useTopRatedFilms';
import PageHeader from "antd/es/page-header";


import { Layout as LayoutComponent } from "antd";

import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { BackToTop } from '../../elements/backToTop';
import { Layout } from './../../components/layout/index';

export const TopRatedFilms = () => {
  const { data, isFetching, error, currentPage, setCurrentPage } = useTopRatedFilms();

  if (isFetching) {
    return <PageHeader title="Загрузка" />;
  }

  if (error) {
    return <PageHeader title="Ошибка" />;
  }

  if (!data?.length) {
    return <PageHeader title="Что-то пошло не так..." />
  }

  const columns = [
    {
      title: 'Постер',
      dataIndex: 'poster_path',
      align: 'center',
      render: imgSrc => <Image src={imgSrc} alt="image" />,
    },
    {
      title: 'Название',
      dataIndex: 'title, id',
      width: '20%',
      align: 'center',
      render: (index, item) => <Link to={`/films/${item.id}`}>{item.title}</Link>
    },
    {
      title: 'Дата релиза',
      dataIndex: 'release_date',
      width: '8%',
      align: 'center'
    },
    {
      title: 'Количество проголосовавших людей',
      dataIndex: 'vote_count',
      width: '5%',
      align: 'center'
    },
    {
      title: 'Средняя оценка',
      dataIndex: 'vote_average',
      width: '5%',
      align: 'center'
    },
    {
      title: 'Короткое описание',
      dataIndex: 'overview',
    },
    {
      title: 'Жанры под которые попадает фильм',
      dataIndex: 'genres',
      render: genres => genres.map((item, index) => {
        return <p key={index}>{item}</p>;
      })
    },
  ];

  return (
    <Layout>
      <Header />
      <LayoutComponent.Content>
        <Table
          onChange={(pagination) => setCurrentPage(pagination.current)}
          columns={columns}
          dataSource={data}
          bordered
          rowKey="id"
          pagination={{
            current: currentPage,
            defaultCurrent: 1,
            pageSize: 20,
            showSizeChanger: false,
            total: 2000
          }}
        />
        <BackToTop />
      </LayoutComponent.Content>

      <Footer />
    </Layout>
  );
};
