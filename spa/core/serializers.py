"""
Serializers for BlogPost APIs
"""
from rest_framework import serializers
from core.models import (
    BlogPost,
    Tag,
)


class BlogPostSerializer(serializers.ModelSerializer):
    """Serializer for BlogPost"""

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'description', 'pub_date', 'reading_time',  'tags']
        read_only_fields = ['id']


class BlogPostDetailSerializer(BlogPostSerializer):
    """Serializer for blogpost detail view."""

    class Meta(BlogPostSerializer.Meta):
        fields = BlogPostSerializer.Meta.fields + ['content']


class TagSerializer(serializers.ModelSerializer):
    """Serializer for tags."""

    class Meta:
        model = Tag
        fields = ['id', 'name']
        read_only_fields = ['id']

    
