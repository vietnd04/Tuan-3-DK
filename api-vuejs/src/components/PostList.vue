<template>
  <div class="post-list">
    <h1>Danh sách bài viết Blog</h1>

    <div v-if="error" class="error">
      <p>Lỗi tải dữ liệu: {{ error }}</p>
    </div>

    <div v-else-if="loading" class="loading">
      <p>Đang tải dữ liệu bài viết...</p>
    </div>

    <ul v-else-if="posts.length > 0">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body.substring(0, 150) }}...</p> <button @click="viewPost(post.id)">Xem chi tiết</button>
      </li>
    </ul>

    <p v-else>Không có bài viết nào.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PostList',
  data() {
    return {
      posts: [],
      error: null,
      loading: false 
    };
  },
  mounted() {
    this.fetchPosts(); 
  },
  methods: {
    fetchPosts() {
      this.loading = true; // Bắt đầu loading
      this.error = null; // Reset lỗi trước mỗi lần gọi API
      axios.get('https://jsonplaceholder.typicode.com/posts') // API giả lập từ JSONPlaceholder
        .then(response => {
          this.posts = response.data; 
          this.loading = false; 
        })
        .catch(error => {
          console.error('Lỗi khi gọi API:', error);
          this.error = 'Không thể tải danh sách bài viết. Vui lòng thử lại sau.'; 
          this.loading = false; 
        });
    },
    viewPost(postId) {
     
      alert(`Xem chi tiết bài viết ID: ${postId}`);
    }
  }
};
</script>

<style scoped>
.post-list {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.post-item {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
  margin-bottom: 15px;
}

.post-item:last-child {
  border-bottom: none;
}

.post-item h3 {
  margin-top: 0;
  margin-bottom: 5px;
}

.post-item p {
  color: #666;
  line-height: 1.4;
}

.post-item button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.error {
  color: red;
  margin-top: 10px;
}

.loading {
  font-style: italic;
  color: #999;
  margin-top: 10px;
}
</style>