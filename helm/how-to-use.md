
## minikube 启动
```
# 启动集群
minikube start
# 查看节点。kubectl 是一个用来跟 K8S 集群进行交互的命令行工具
kubectl get node
# 停止集群
minikube stop
# 清空集群
minikube delete --all
# 安装集群可视化 Web UI 控制台
minikube dashboard

```

## 配置ingress

```
minikube addons enable ingress
```


## 安装和卸载Helm

```
helm install domain-resolver . --values .\values.yaml
```


```
helm uninstall domain-resolver
```