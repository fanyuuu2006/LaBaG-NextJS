import { InfoCircleOutlined } from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { Button, Space, Table, Tooltip } from "antd";
import { useNowMode } from "@/context/NowModeContext";

import { ColumnsType } from "antd/es/table";
import { PData, PDatas } from "labag";
import { useModal } from "fanyucomponents";
import { ModeColors } from "@/utils/ModeColors";

const columns: ColumnsType<{
  name: string;
  code: string;
  rate: string;
  same3: number;
  same2: number;
  same1: number;
}> = [
  { title: "名稱", dataIndex: "name", key: "name" },
  { title: "代號", dataIndex: "code", key: "code" },
  { title: "機率", dataIndex: "rate", key: "rate", align: "right" },
  { title: "lv 3", dataIndex: "same3", key: "same3", align: "right" },
  { title: "lv 2", dataIndex: "same2", key: "same2", align: "right" },
  { title: "lv 1", dataIndex: "same1", key: "same1", align: "right" },
];

export const RuleButton = (props: AntdIconProps) => {
  const { NowMode } = useNowMode();
  const Modal = useModal();
  const dataSource: {
    name: string;
    code: string;
    rate: string;
    same3: number;
    same2: number;
    same1: number;
  }[] = Object.values(PDatas).map((P: PData) => ({
    name: P.name,
    code: P.code,
    rate: `${P.rates[NowMode]}%`,
    same3: P.scores[0],
    same2: P.scores[1],
    same1: P.scores[2],
  }));
  return (
    <>
      <Tooltip title="查看計分規則">
        <InfoCircleOutlined
          className="Label"
          style={{
            color: "#FFFFFF",
            position: "fixed",
            bottom: "0.5em",
            left: "0.5em",
          }}
          {...props}
          onClick={() => {
            Modal.Open();
          }}
        />
      </Tooltip>
      <Modal.Container>
        <Space
          className="Hint"
          direction="vertical"
          align="center"
          style={{
            backgroundColor: "#E0E0E0",
            border: `5px solid ${ModeColors[NowMode].dark}`,
            borderRadius: "10px",
            padding: "1em",
            textAlign: "start",
          }}
        >
          <Table
            size="small"
            pagination={false}
            columns={columns}
            dataSource={dataSource}
            style={{ whiteSpace: "nowrap", width: "100%" }}
          />
          <div style={{ textAlign: "start" }}>
            <mark>三個皆相同</mark>: lv3對應的名稱之分數。
            <br />
            <mark>僅兩個相同</mark>: lv2對應的兩個相同的名稱之分數 +
            lv1對應的一個不同的名稱之分數 / 1.4。
            <br />
            <mark>三個皆不同</mark>: 加總lv1對應的名稱之分數 / 3。
          </div>
          <Button
            type="primary"
            onClick={() => {
              Modal.Close();
            }}
          >
            關閉
          </Button>
        </Space>
      </Modal.Container>
    </>
  );
};
