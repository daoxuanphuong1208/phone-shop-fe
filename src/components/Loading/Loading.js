import { Spin } from "antd";

const Loading = (props) => {
  const { isLoading, delay, children } = props;
  return (
    <Spin spinning={isLoading} delay={delay}>
      {children}
    </Spin>
  );
};

export default Loading;
