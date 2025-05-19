import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteMockServe } from 'vite-plugin-mock';
import path from 'path'; // 需要添加 path 模块

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    viteMockServe({
      mockPath: 'mock', // mock 文件夹的位置
      localEnabled: command === 'serve', // 开发环境启用
      prodEnabled: false, // 生产环境不启用
      logger: true, // 启用日志（可选）
    }),
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src'), // 正确配置路径别名
    },
  },
}));