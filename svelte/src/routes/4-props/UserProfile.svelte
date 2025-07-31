<script lang="ts">
  interface Props {
    name: string
    birthDate: Date
    gender: 'male' | 'female'
  }

  let props: Props = $props() // สามารถตั้ง Interface สำหรับการรับ Props ได้
</script>

<div class="p-4 bg-gray-200 rounded-xl border-2 border-gray-300 text-gray-800">
  <h2 class="text-xl font-bold mb-2">User Profile</h2>
  <div class="space-y-1">
    <p><b>Name:</b> {props.name}</p>
    <p><b>Birth Date:</b> {props.birthDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    <p><b>Age:</b> {new Date().getFullYear() - props.birthDate.getFullYear()} years</p>
    <p><b>Gender:</b> {props.gender === 'male' ? '♂️ Male' : '♀️ Female'}</p>
  </div>
</div>
