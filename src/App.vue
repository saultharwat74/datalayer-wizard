<script setup lang="ts">
</script>

<template>
  <div class="animated-bg h-screen w-full flex justify-center items-center">
    <div class="text-center text-white max-w-2xl px-4 flex flex-col items-center">
      <div class="flex flex-col items-center mb-12">
        <img src="@/assets/logo.png" alt="DataLayer Event Helper" class="w-64 h-64 mb-4" />
        <h1 class="text-6xl font-bold tracking-wider">Coming Soon</h1>
      </div>
      <div class="text-xl leading-relaxed space-y-4 opacity-90">
        <p>Welcome to DataLayer Wizard - Your DataLayer Creation Assistant</p>
        <p>This tool helps non-technical users easily generate and implement DataLayer Events Code For Google Tag
          Manager without any technical knowledge</p>
        <div class="mt-8 text-lg space-y-2 opacity-80">
          <p>🎯 Create Custom DataLayer Events</p>
          <p>📊 Define event parameters</p>
          <p>🔍 Preview events in real-time</p>
          <p>📋 Generate ready-to-use GTM code</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animated-bg {
  background: linear-gradient(-45deg,
      #ee7752,
      #e73c7e,
      #23a6d5,
      #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.text-center p {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>