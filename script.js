document.addEventListener("DOMContentLoaded", function() {

	const projectsGrid = document.getElementById("projects-grid");
	let dragSrcEl = null;
	
	function handleDragStart(e) {
	  dragSrcEl = this;
	  e.dataTransfer.effectAllowed = "move";
	  e.dataTransfer.setData("text/html", this.outerHTML);
	  this.classList.add("dragging");
	}
	
	function handleDragOver(e) {
	  if (e.preventDefault) { e.preventDefault(); }
	  e.dataTransfer.dropEffect = "move";
	  return false;
	}
	
	function handleDragEnter(e) {
	  this.classList.add("over");
	}
	
	function handleDragLeave(e) {
		if (e.relatedTarget && this.contains(e.relatedTarget)) {
		  return;
		}
		this.classList.remove("over");
	  }
	function handleDrop(e) {
	  if (e.stopPropagation) { e.stopPropagation(); }
	  if (dragSrcEl !== this) {
		dragSrcEl.outerHTML = this.outerHTML;
		this.outerHTML = e.dataTransfer.getData("text/html");
		addDnDHandlers(document.querySelectorAll("#projects-grid .project"));
	  }
	  return false;
	}
	
	function handleDragEnd(e) {
	  this.classList.remove("dragging");
	  document.querySelectorAll("#projects-grid .project").forEach(function(item) {
		item.classList.remove("over");
	  });
	}
	
	function addDnDHandlers(items) {
	  items.forEach(function(item) {
		item.setAttribute("draggable", "true");
		item.addEventListener("dragstart", handleDragStart, false);
		item.addEventListener("dragenter", handleDragEnter, false);
		item.addEventListener("dragover", handleDragOver, false);
		item.addEventListener("dragleave", handleDragLeave, false);
		item.addEventListener("drop", handleDrop, false);
		item.addEventListener("dragend", handleDragEnd, false);
	  });
	}
	
	addDnDHandlers(document.querySelectorAll("#projects-grid .project"));
	
  });