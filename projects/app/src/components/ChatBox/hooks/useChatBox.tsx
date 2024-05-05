// 导入ExportChatType类型，ChatItemType类型，useCallback函数，htmlTemplate，fileDownload函数
import { ExportChatType } from '@/types/chat';
import { ChatItemType } from '@fastgpt/global/core/chat/type';
import { useCallback } from 'react';
import { htmlTemplate } from '@/constants/common';
import { fileDownload } from '@/web/common/file/utils';

// 定义useChatBox函数
export const useChatBox = () => {
  // 定义onExportChat函数，接收{ type: ExportChatType, history: ChatItemType[] }参数
  const onExportChat = useCallback(
    ({ type, history }: { type: ExportChatType; history: ChatItemType[] }) => {
      // 定义getHistoryHtml函数
      const getHistoryHtml = () => {
        // 获取历史Dom
        const historyDom = document.getElementById('history');
        // 如果没有历史Dom，返回
        if (!historyDom) return;
        // 遍历历史Dom，获取每个子元素
        const dom = Array.from(historyDom.children).map((child, i) => {
          // 获取头像
          const avatar = `<img src="${child.querySelector<HTMLImageElement>('.avatar')?.src
            }" alt="" />`;

          // 获取聊天内容
          const chatContent = child.querySelector<HTMLDivElement>('.markdown');

          // 如果没有聊天内容，返回空字符串
          if (!chatContent) {
            return '';
          }

          // 克隆聊天内容
          const chatContentClone = chatContent.cloneNode(true) as HTMLDivElement;

          // 移除代码标题
          const codeHeader = chatContentClone.querySelectorAll('.code-header');
          codeHeader.forEach((childElement: any) => {
            childElement.remove();
          });

          // 返回聊天项的HTML
          return `<div class="chat-item">
            ${avatar}
            ${chatContentClone.outerHTML}
          </div>`;
        });

        // 替换模板内容
        const html = htmlTemplate.replace('{{CHAT_CONTENT}}', dom.join('\n'));
        // 返回HTML
        return html;
      };

      // 定义map，映射ExportChatType到对应的函数
      const map: Record<ExportChatType, () => void> = {
        md: () => {
          // 下载markdown文件
          fileDownload({
            text: history.map((item) => item.value).join('\n\n'),
            type: 'text/markdown',
            filename: 'chat.md'
          });
        },
        html: () => {
          // 获取HTML
          const html = getHistoryHtml();
          // 如果HTML存在，下载HTML文件
          html &&
            fileDownload({
              text: html,
              type: 'text/html',
              filename: '聊天记录.html'
            });
        },
        pdf: () => {
          // 获取HTML
          const html = getHistoryHtml();

          // 如果HTML存在，使用html2pdf转换HTML为PDF
          html &&
            // @ts-ignore
            html2pdf(html, {
              margin: 0,
              filename: `聊天记录.pdf`
            });
        }
      };

      // 调用map中对应的函数
      map[type]();
    },
    []
  );

  // 返回{ onExportChat }
  return {
    onExportChat
  };
};
