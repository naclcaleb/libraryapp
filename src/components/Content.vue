<template>
    
    <a-layout style="padding: 0 24px 24px">
        <a-layout-content :style="{ padding: '24px', margin: 0, minHeight: '280px' }">
          <Metrics v-if="page === 'metrics'"/>
          <Flags v-if="page === 'flags'" />
          <BugReports v-if="page === 'bugReports'"/>
          <ContactForms v-if="page === 'contactForms'"/>
          <CompanyHighLow v-if='page === "companyHighLow"'/>
        </a-layout-content>
    </a-layout>

</template>

<script>
import Metrics from './Metrics'
import Flags from './Flags'
import BugReports from './BugReports'
import ContactForms from './ContactForms'
import CompanyHighLow from './CompanyHighLow'

export default {
    name: "Content",
    props: ['page'],
    components: { Metrics, Flags, BugReports, ContactForms, CompanyHighLow }
}
</script>

<style scoped>
#content {
    display: block;
    overflow-y: auto;
}
</style>