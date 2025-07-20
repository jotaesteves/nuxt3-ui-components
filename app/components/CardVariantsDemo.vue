<!--
  Example component demonstrating different card variants
-->
<template>
  <BaseSection title="Card Variants Demo"
    subtitle="Demonstration of different BaseCard variants using the cardVariant utility" background="gray">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Default Card -->
      <BaseCard>
        <template #header>
          <h3 class="text-lg font-semibold">Default Card</h3>
        </template>
        <p class="text-gray-600 dark:text-gray-300">
          This is a default card with standard styling.
        </p>
        <template #footer>
          <UButton variant="outline" size="sm">Action</UButton>
        </template>
      </BaseCard>

      <!-- Hover Card -->
      <BaseCard variant="hover">
        <template #header>
          <h3 class="text-lg font-semibold">Hover Card</h3>
        </template>
        <p class="text-gray-600 dark:text-gray-300">
          This card has hover effects. Hover to see the transformation.
        </p>
        <template #footer>
          <UButton variant="outline" size="sm">Hover Me</UButton>
        </template>
      </BaseCard>

      <!-- Bordered Card -->
      <BaseCard variant="bordered">
        <template #header>
          <h3 class="text-lg font-semibold">Bordered Card</h3>
        </template>
        <p class="text-gray-600 dark:text-gray-300">
          This card has a thicker border for emphasis.
        </p>
        <template #footer>
          <UButton variant="outline" size="sm">Click Me</UButton>
        </template>
      </BaseCard>

      <!-- Large Padding Card -->
      <BaseCard padding="lg" variant="hover">
        <template #header>
          <h3 class="text-lg font-semibold">Large Padding + Hover</h3>
        </template>
        <p class="text-gray-600 dark:text-gray-300">
          This card combines large padding with hover effects.
        </p>
        <template #footer>
          <UButton variant="outline" size="sm">Large Card</UButton>
        </template>
      </BaseCard>

      <!-- Small Padding Card -->
      <BaseCard padding="sm" variant="bordered">
        <template #header>
          <h3 class="text-lg font-semibold">Small Padding + Border</h3>
        </template>
        <p class="text-gray-600 dark:text-gray-300">
          Compact card with small padding and border.
        </p>
        <template #footer>
          <UButton variant="outline" size="sm">Compact</UButton>
        </template>
      </BaseCard>

      <!-- All Features Combined -->
      <BaseCard padding="md" variant="hover">
        <template #header>
          <h3 class="text-lg font-semibold">Best of Both</h3>
        </template>
        <p class="text-gray-600 dark:text-gray-300">
          Medium padding with hover effects for the perfect balance.
        </p>
        <template #footer>
          <UButton size="sm">Perfect Balance</UButton>
        </template>
      </BaseCard>
    </div>

    <!-- Code Example -->
    <div class="mt-12">
      <BaseCard>
        <template #header>
          <h3 class="text-lg font-semibold">Usage Examples</h3>
        </template>

        <div class="space-y-4">
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">Default Card</h4>
            <code class="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded block">
          &lt;BaseCard&gt;Content&lt;/BaseCard&gt;
        </code>
          </div>

          <div>
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">Hover Card with Large Padding</h4>
            <code class="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded block">
          &lt;BaseCard variant="hover" padding="lg"&gt;Content&lt;/BaseCard&gt;
        </code>
          </div>

          <div>
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">Bordered Card with Small Padding</h4>
            <code class="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded block">
          &lt;BaseCard variant="bordered" padding="sm"&gt;Content&lt;/BaseCard&gt;
        </code>
          </div>
        </div>
      </BaseCard>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
// This component demonstrates the usage of cardVariant utility
// through the BaseCard component's variant and padding props
</script>
