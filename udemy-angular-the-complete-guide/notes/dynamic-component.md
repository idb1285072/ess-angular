dynamic-component

1. *ngIf
2. 

constructor(private componentFactoryResolver: ComponentFactoryResolver){}

private showErrorAlert(message:string){
  // const alertComp = new AlertComponent();
  const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
}