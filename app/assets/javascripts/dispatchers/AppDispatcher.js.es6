class AppDispatcher extends Flux.Dispatcher {
	
}

window.TFADispatcher = new AppDispatcher();
window.dispatch = TFADispatcher.dispatch.bind(TFADispatcher);