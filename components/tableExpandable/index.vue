<template>
  <div class="md:container md:mx-auto pt-6 justify-center">
    <el-card>
      <el-table
        :data="propsTableData"
        border
        :default-sort="{prop: 'id', order: 'descending'}"
        class="displayByWidth"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="ml-5">
              <el-button
                size="mini"
                type="primary"
                @click="handleRenting(scope.row)"
              >
                Renting
              </el-button>
              <el-button
                size="mini"
                style="background: #bf7cb9; borfer-colot: #bf7cb9; color: #fff;"
                @click="handleDeposit(scope.row)"
              >
                Deposit
              </el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.row)"
              >
                Edit
              </el-button>
              <el-popconfirm
                title="Are you sure to delete this?"
                @confirm="handleDelete(scope.row.id)"
              >
                <el-button
                  slot="reference"
                  size="mini"
                  type="danger"
                >
                  Delete
                </el-button>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
        <template v-for="(col, index) in propsTableHeader">
          <el-table-column
            v-if="col.title !== 'Status' && col.title !== 'Avatar'"
            :key="index"
            :label="col.title"
          >
            <template slot-scope="scope">
              <span class="rowSpan">{{ scope.row[col.field] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="col.title === 'Status'"
            :key="index"
            :label="col.title"
          >
            <template slot-scope="scope">
              <span class="rowSpan">
                <el-tag v-if="scope.row[col.field] =='ACTIVE'" type="success"> {{ scope.row[col.field] }}</el-tag>
                <el-tag v-if="scope.row[col.field] !=='ACTIVE'" type="danger"> {{ scope.row[col.field] }}</el-tag>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="col.title === 'Avatar'"
            :key="index"
            :label="col.title"
          >
            <template slot-scope="scope">
              <img :src="(scope.row[col.field])">
            </template>
          </el-table-column>
          <el-table-column
            v-if="col.field === 'thumbnail_url'"
            :key="index"
            :label="col.title"
          >
            <template slot-scope="scope">
              <span class="rowSpan">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row[col.field]"
                  fit="contain"
                />
              </span>
            </template>
          </el-table-column>
        </template>
      </el-table>

      <el-card
        v-for="(item, index) in propsTableData"
        :key="index"
        class="box-card displayByWidthMobile"
      >
        <img v-if="item['thumbnail_url']" :src="item['thumbnail_url']" class="image">
        <div v-for="(title, indexTitle) in propsTableHeader" :key="indexTitle" class="text item flexing">
          <div class="titleHeader font-black">
            <span v-if="title.title !== 'Picture'">{{ title.title }}</span>
          </div>
          <div class="ItemValue">
            <span v-if="title.title !== 'Picture'"> {{ item[title.field] }}</span>
          </div>
        </div>
        <el-button
          size="mini"
          @click="handleEdit(index, item)"
        >
          Edit
        </el-button>
      </el-card>
      <div>
        <el-pagination
          :current-page="currentPage"
          :page-sizes="propsPageSizes"
          :page-size="propsPageSize"
          layout="total, sizes, prev, pager, next"
          :total="propsTotalItems"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
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
    // propsHiddenDelete: {
    //   type: Boolean,
    //   required: true,
    //   default: true
    // },
    propsPageSizes: {
      type: [Array, Object],
      required: true,
      default: () => {
        return [10, 50, 100]
      }
    },
    propsPageSize: {
      type: Number,
      default: null,
      required: 10
    },
    propsTotalItems: {
      type: Number,
      default: 10,
      required: true
    }
  },
  data () {
    return {
      currentPage: null
    }
  },
  watch: {
    propsCurrentPage (page) {
      // eslint-disable-next-line no-console
      this.currentPage = page
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
    },
    handleRenting (val) {
      this.$emit('handle-renting', val)
    },
    handleDeposit (val) {
      this.$emit('handle-deposit', val)
    },
    tableRowClassName ({ row, rowIndex }) {
      // eslint-disable-next-line no-console
      console.log('row==>', row)
      if (row.rent === 1) {
        return 'rent-row'
      } else if (row.rent === 2) {
        return 'deposit-row'
      }
      return ''
    }
  }
}
</script>

<style>
.rowSpan {
  word-break: break-word !important;
}
.cell {
  word-break: break-word !important;
}
.displayByWidthMobile {
  display: none;
}
.flexing {
  display: flex;
  border: none;
  align-items: center;
  justify-content: space-between;
}
@media only screen and (max-width: 500px) {
  .displayByWidth {
    display: none;
  }

  .displayByWidthMobile {
    display: block;
    margin-bottom: 5px;
  }
}
 .el-table .deposit-row {
    background: #f0b4eb;
  }

  .el-table .rent-row {
    background: #b8b9b8;
  }
</style>
