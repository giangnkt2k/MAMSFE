<template>
  <div class="md:container md:mx-auto pt-6 justify-center">
    <el-card>
      <el-table
        :data="propsTableData"
        border
        :default-sort="{prop: 'id', order: 'descending'}"
        class="displayByWidth"
      >
        <template v-for="(col, index) in propsTableHeader">
          <el-table-column
            v-if="col.title !== 'Status' && col.title !== 'New number'"
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
            v-if="col.field === 'new_number'"
            :key="index"
            :label="col.title"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row[col.field]" placeholder="Please input" />
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
        <el-table-column
          width="180"
          label="Total"
        >
          <template slot-scope="scope">
            {{ scope.row['new_number'] - scope.row['old_number'] }}
          </template>
        </el-table-column>
        <el-table-column
          width="180"
          label="Actions"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleSave(scope.row, scope.row['new_number'] - scope.row['old_number'])"
            >
              Save
            </el-button>
          </template>
        </el-table-column>
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
          Edits
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
    propsHideEdit: {
      type: Boolean,
      default: false,
      required: false
    },
    propsHideDelete: {
      type: Boolean,
      default: false,
      required: false
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
      currentPage: null,
      currentDate: ''
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
    handleSave (item, val) {
      if (val < 0) {
        this.$message.error('The new number must be greater than the old number')
      } else {
        this.$emit('handle-save', item, val)
      }
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
</style>
