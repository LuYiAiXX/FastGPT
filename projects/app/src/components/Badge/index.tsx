import React from 'react';
import { Box } from '@chakra-ui/react';

const Badge = ({
  children,
  isDot = false,
  max = 99,
  count = 0
}: {
  children: React.ReactNode;
  isDot?: boolean;
  max?: number;
  count?: number;
}) => {
  return (
    <Box position={'relative'}>
      {children}
      {count > 0 && (
        <Box position={'absolute'} right={0} top={0} transform={'translate(70%,-50%)'}>
          {isDot ? (
            <Box w={'5px'} h={'5px'} bg={'red.600'} borderRadius={'20px'}></Box>
          ) : (
            <Box
              color={'white'}
              bg={'red.600'}
              lineHeight={0.9}
              borderRadius={'100px'}
              px={'4px'}
              py={'2px'}
              fontSize={'12px'}
              border={'1px solid white'}
            >
              {count > max ? `${max}+` : count}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Badge;

// 导入React模块
// 导入Box组件，来自于@chakra-ui/react
// 定义Badge组件，接收一个对象作为参数
// 该组件由两部分组成，一部分是显示children，另一部分是显示count
// 如果count大于0，则显示一个绝对定位的Box，里面有isDot为true时显示一个红点，否则显示一个数字
// 如果count大于max，则显示max+，否则显示count