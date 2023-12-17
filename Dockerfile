# 指定nodeJS版本镜像
FROM node:18.11.0
# 脚本维护者姓名 随意
MAINTAINER why
# 创建vue项目根路径，需要在这个目录下运行npm run dev/serve命令
ADD . /transport-security-web/
# 切换vue项目根路径为工作路径
WORKDIR /transport-security-web/
# 安装项目依赖
RUN npm install
# 重新构建node-sass（防止node-sas安装失败）
RUN npm rebuild node-sass --force
# 设置项目运行的端口
ENV PORT 6300
# 设置项目对外暴露的端口
EXPOSE 6300
# 容器启动之后运行npm run dev命令把vue项目运行起来
CMD ["npm", "run","build"]
