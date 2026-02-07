"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";


interface ChartDataPoint {
  label: string;
  value: number;
}

interface NumberDotLineChartProps {
  data: ChartDataPoint[];
  title?: string;
  description?: string;
  trend?: {
    value: number;
    label: string;
  };
  color?: string;
}

export function NumberDotLineChart({
  data,
  title = "Statistics",
  description = "Recent activity",
  trend,
  color = "hsl(var(--primary))"
}: NumberDotLineChartProps) {

  const chartConfig = {
    value: {
      label: "Value",
      color: color,
    }
  } satisfies ChartConfig;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title}
          {trend && (
            <Badge
              variant="outline"
              className={`border-none ml-2 ${trend.value >= 0 ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}
            >
              {trend.value >= 0 ? '+' : ''}{trend.value}%
            </Badge>
          )}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 10,
              bottom: 10
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              cursorStyle={{}}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="linear"
              stroke={color}
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={<CustomizedDot color={color} />}
              activeDot={{ r: 6, fill: color }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const CustomizedDot = (
  props: React.SVGProps<SVGCircleElement> & { value?: number; color?: string }
) => {
  const { cx, cy, value, color } = props;

  return (
    <g>
      {/* Main dot */}
      <circle cx={cx} cy={cy} r={9} fill={color || "currentColor"} />
      <text
        className="dark:text-black text-white"
        x={cx}
        y={cy}
        textAnchor="middle"
        dy={8}
        fontSize={8}
        fontWeight={600}
        fill="currentColor"
        transform="translate(0, -5)"
      >
        {value?.toString()}
      </text>
    </g>
  );
};
