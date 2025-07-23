<script lang="ts">
  export interface Props {
    name: string
    birthDate: Date
    salary: number
    married: boolean
    gender: 'male' | 'female'
    country: string
    avatar: FileList | null
  }

  let props: Props = $props()

  const avatarUrl = $derived.by(() => {
    if (props.avatar && props.avatar.length > 0) {
      return URL.createObjectURL(props.avatar[0]);
    }
    return null;
  });
</script>

<div class="space-y-1 max-w-xs p-3 rounded-lg bg-gray-100">
  <h2 class="text-lg font-bold">Profile Information</h2>
  <p><strong>Name:</strong> {props.name}</p>
  <p><strong>Birth Date:</strong> {props.birthDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  <p><strong>Salary:</strong> ${props.salary.toFixed(2)}</p>
  <p><strong>Married:</strong> {props.married ? 'Yes' : 'No'}</p>
  <p><strong>Gender:</strong> {props.gender === 'male' ? 'Male' : 'Female'}</p>
  <p><strong>Country:</strong> {props.country}</p>
  <p>
    <strong>Avatar:</strong>
    {#if avatarUrl}
      <img class="mt-1" src={avatarUrl} alt="Avatar" />
    {/if}
  </p>
</div>
