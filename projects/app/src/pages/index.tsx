// 导入serviceSideProps函数，用于从服务器获取数据
import { serviceSideProps } from '@/web/common/utils/i18n';
// 导入React和useEffect函数
import React, { useEffect } from 'react';
// 导入Loading组件
import Loading from '@fastgpt/web/components/common/MyLoading';
// 导入useRouter函数
import { useRouter } from 'next/router';

// 定义index函数，返回Loading组件
const index = () => {
  // 使用useRouter函数获取router
  const router = useRouter();
  // 使用useEffect函数，当router改变时，执行router.push('/app/list')
  useEffect(() => {
    router.push('/app/list');
  }, [router]);
  // 返回Loading组件
  return <Loading></Loading>;
};

// 定义getServerSideProps函数，用于从服务器获取数据
export async function getServerSideProps(content: any) {
  // 返回一个对象，包含props属性，调用serviceSideProps函数获取数据
  return {
    props: {
      ...(await serviceSideProps(content))
    }
  };
}
// 导出index函数
export default index;