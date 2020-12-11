from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View

# Create your views here.
class Home(View):
    scripts = ["theme.jsx","footer.jsx","toolbar.jsx","index.jsx"]
    def get(self,req):
        return render(req,"./homepage/index.html",{"scripts":Home.scripts})