"""
Views for the Blog Post APIs
"""
from rest_framework import viewsets, mixins
from rest_framework import authentication 
from rest_framework import permissions

from core.models import BlogPost, Tag
from core import serializers


class BlogPostViewSet(viewsets.ModelViewSet):
    """View for manage blogpost APIs"""
    serializer_class = serializers.BlogPostDetailSerializer
    queryset = BlogPost.objects.all()
    # authentication_classes = [authentication.TokenAuthentication]
    # permission_classes = [permissions.IsAuthenticated]



    def get_queryset(self):
        """Retrieve blogpost for authenticated user."""
        return self.queryset.filter().order_by('-id')
    

    def get_serializer_class(self):
        """Return the serializer class for request."""
        if self.action == 'list':
            return serializers.BlogPostSerializer
        return self.serializer_class
    
    def perform_create(self, serializer):
        """Create a new blogpost"""
        serializer.save(user=self.request.user)

class TagViewSet(mixins.DestroyModelMixin,
                mixins.UpdateModelMixin ,
                mixins.ListModelMixin, viewsets.GenericViewSet):
    """Manage tags in the database"""
    serializer_class = serializers.TagSerializer
    queryset = Tag.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Filter queryset to authenticated user."""
        return self.queryset.filter().order_by('-name')
    