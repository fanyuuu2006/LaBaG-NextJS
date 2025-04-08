import { DownloadOutlined } from "@ant-design/icons";
import React from "react";

export interface DownloadButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  fileName?: string;
  fileUrl: string;
  style?: Omit<React.CSSProperties, "cursor">;
}

/**
 * 下載按鈕組件
 * 用來創建一個可以下載檔案的按鈕。
 *
 * @param {DownloadButtonProps} props - 組件的屬性
 * @param {string} [props.fileName] - 下載檔案時顯示的名稱。若未提供，將使用檔案 URL 的檔案名稱
 * @param {string} props.fileUrl - 檔案的 URL
 * @returns {React.ReactNode} 返回包含下載功能的按鈕
 */
export const DownloadButton: React.FC<DownloadButtonProps> = (
  props: DownloadButtonProps
) => {
  const { children, style, fileName, fileUrl, ...rest } = props;
  return (
    <a
      download={fileName} // 如果 fileName 沒有提供，則會使用原始檔案名稱
      href={fileUrl}
      style={{
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      <>
        <DownloadOutlined /> {children}
      </>
    </a>
  );
};
