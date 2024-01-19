import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import postCssPxToRem from "postcss-pxtorem";
import checker from "vite-plugin-checker";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9000,
  },
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    dts(),
  ],
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          // 自适应，px>rem转换
          rootValue: 75, // 75表示750设计稿，37.5表示375设计稿
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
          selectorBlackList: ["norem"], // 过滤掉norem-开头的class，不进行rem转换
        }),
      ],
    },
  },
  build: {
    //打包后文件目录
    outDir: "scripts",
    //压缩
    minify: false,
    rollupOptions: {
      //忽略打包vue文件
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
    lib: {
      entry: "./lib/h5-table/index.ts",
      name: "h5table",
      fileName: (format: any) => `h5table.${format}.js`,
    },
  },
});
