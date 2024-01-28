function skillsMember() {
  var skills = document.getElementById("skills");
  var skillsMember = document.getElementById("skillsMember");
  var skillsMemberValue = skillsMember.value;
  var skillsMemberText = skillsMember.options[skillsMember.selectedIndex].text;

  if (skillsMemberValue == "0") {
    skills.style.display = "none";
  } else {
    skills.style.display = "block";
  }
}