import { useEffect, useState } from "react";
import { Divider, Card, message } from "antd";
import {
  AreaChartOutlined,
  ContainerOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import * as StatsService from "../../services/StatsService";
import classNames from "classnames/bind";
import styles from "./AdminStatistical.module.scss";

const cx = classNames.bind(styles);

const AdminStatistical = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await StatsService.getStats();
      if (res.status === "OK") {
        setStats(res.data);
      } else {
        message.error("Không thể lấy dữ liệu thống kê");
      }
    } catch (err) {
      console.error("Fetch stats error:", err);
      message.error("Đã xảy ra lỗi khi lấy dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cardStats = stats
    ? [
        {
          title: "Tổng doanh thu",
          value: stats.revenue.toLocaleString("vi-VN") + "₫",
          icon: <AreaChartOutlined style={{ fontSize: 24, color: "#fff" }} />,
          color: "#0088FE",
        },
        {
          title: "Đơn đã giao",
          value: stats.deliveredOrders,
          icon: (
            <ShoppingCartOutlined style={{ fontSize: 24, color: "#fff" }} />
          ),
          color: "#dd2a3f",
        },
        {
          title: "Hàng trong kho",
          value: stats.stock,
          icon: <ContainerOutlined style={{ fontSize: 24, color: "#fff" }} />,
          color: "#00C49F",
        },
        {
          title: "Khách hàng hệ thống",
          value: stats.customers,
          icon: <UserOutlined style={{ fontSize: 24, color: "#fff" }} />,
          color: "#FF8042",
        },
      ]
    : [];

  const chartData = stats
    ? stats.monthlyRevenue.map((item) => ({
        name: `Tháng ${item.month}`,
        uv: item.total,
      }))
    : [];

  return (
    <div className={cx("wrapper")}>
      <h2>Thống kê</h2>
      <Divider />
      <div className={cx("cardWrapper")}>
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          cardStats.map((stat, index) => (
            <Card
              key={index}
              size="small"
              title={<span className={cx("cardTitle")}>{stat.title}</span>}
              extra={stat.icon}
              style={{
                width: "100%",
                backgroundColor: stat.color,
                color: "#fff",
              }}
            >
              <p className={cx("cardValue")}>{stat.value}</p>
            </Card>
          ))
        )}
      </div>

      <h3>Doanh thu theo tháng: Năm {new Date().getFullYear()}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Bar dataKey="uv" fill="#8956FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminStatistical;
