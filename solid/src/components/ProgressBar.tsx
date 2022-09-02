import styles from "../progress.module.css";

interface ProgressBarProps {
  title: string;
  value: number;
  color:
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose";
}

const ProgressBar = (props: ProgressBarProps) => {
  return (
    <div class="flex flex-col w-full gap-1">
      <div class="flex flex-row justify-between text-sm sm:text-md">
        <p class="text-left">{props.title}</p>
        <p class="text-right">{props.value.toFixed(2)}%</p>
      </div>
      <div class="relative bg-gray-200 rounded">
        <div
          style={{ width: `${Math.min(props.value, 100)}%` }}
          class={`absolute top-0 h-4 rounded ${styles.shim} bg-emerald-400`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
