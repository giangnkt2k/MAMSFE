<template>
  <div class="md:container md:mx-auto pt-6">
    <el-table
      :data="propsTableData"
      style="width: 100%"
      border
      :default-sort="{prop: 'id', order: 'descending'}"
    >
      <template v-for="(col, index) in propsTableHeader">
        <el-table-column
          :key="index"
          :label="col.title"
          width="170"
          sortable
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row[col.field] }}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        width="180"
        label="Operations"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >
            Edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page.sync="CurrentPage"
        :page-sizes="propsPageSizes"
        :page-size="propsPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="propsTotalItems"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentsTable',
  props: {
    propsTableData: {
      type: [Array, Object],
      required: true,
      default: () => {
        return []
      }
    },
    propsTableHeader: {
      type: [Array, Object],
      required: true,
      default: () => {
        return []
      }
    },
    propsCurrentPage: {
      type: Number,
      default: 1,
      required: true
    },
    propsPageSizes: {
      type: [Array, Object],
      required: true,
      default: () => {
        return []
      }
    },
    propsPageSize: {
      type: Number,
      default: null,
      required: true
    },
    propsTotalItems: {
      type: Number,
      default: 10,
      required: true
    }
  },
  computed: {
    CurrentPage () {
      return this.propsCurrentPage
    }
  },
  methods: {
    // edit table
    handleEdit (index, row) {
      this.$emit('handle-edit', index, row)
    },
    handleDelete (index, row) {
      this.$emit('handle-delete', index, row)
    },
    // pagination
    handleSizeChange (val) {
      this.$emit('handle-size-change', val)
    },
    handleCurrentChange (val) {
      this.$emit('handle-current-change', val)
    }
  }
}
</script>

<style>

</style>
