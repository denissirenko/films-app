import { Table } from 'antd';
import { useLatestFilms } from './hooks/useLatestFilms';
import "antd/dist/antd.css";
import PageHeader from "antd/es/page-header";

import { Layout as LayoutComponent } from "antd";

import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { BackToTop } from '../../elements/backToTop';
import { Layout } from './../../components/layout/index';

export const LatestFilms = () => {

    const {
        isLoading,
        latestFilms,
        error
    } = useLatestFilms();

    if (isLoading) {
        return <PageHeader title="Виконується загрузка" />;
    }

    if (error) {
        return <PageHeader title="Помилка завантаження" />;
    }
    const columns = [
        {
            //постер
            title: 'Постер',
            dataIndex: 'poster_path',
            key: 'poster_path',

        },

        {
            //Название
            title: 'Назва',
            dataIndex: 'title',
            key: 'title',
            align: 'center',
            width: '10%',

        },

        {
            // дата выхода
            title: 'Дата релізу',
            dataIndex: 'release_date',
            key: 'release_date',
            align: 'center',
            width: '10%',
        },

        {
            //Доходность
            title: 'Дохідність',
            dataIndex: 'revenue',
            key: 'revenue',
            align: 'center',
            width: '10%',
        },

        {

            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
        },

        {
            //Популярность
            title: 'Популярність',
            dataIndex: 'popularity',
            key: 'popularity',
            align: 'center',
            width: '10%',
        },

        {
            //Короткое описание
            title: 'Короткий опис',
            dataIndex: 'overview',
            key: 'overview',
            align: 'left',

        },

    ];
    //Для проверки
    //addToData( latestFilms );

    const data = latestFilms && latestFilms.map((item) => {

        const overview = item.overview ? `${item.overview.substring(0, 190)}...` : <p>Немає опису для даного фільму</p>;
        const poster_path = item.poster_path ? <img alt={item.title}
            src={item.poster_path} width={150} /> : <p>Немає постеру для даного фільму</p>;
        const release_date = item.release_date ? item.release_date : <p>Дата виходу не визнаячена</p>
        return {
            ...item,
            key: item.id,
            overview,
            poster_path,
            release_date,
        };
    });

    const filmsTabel = latestFilms && !isLoading && (
        <Table
            dataSource={data}
            columns={columns}
            bordered
            rowKey="key"

        />
    );

    return (
        <Layout>
            <Header />
            <LayoutComponent.Content>
                <PageHeader title="Остані фільми. Перегляньте всі новинки на українському ринку" />
                {filmsTabel}

                <BackToTop />
            </LayoutComponent.Content>

            <Footer />
        </Layout>
    );
};

