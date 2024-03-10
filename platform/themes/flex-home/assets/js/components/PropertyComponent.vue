<template>
    <div class="row rowm10">
        <div class="half-circle-spinner" v-if="isLoading">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
        </div>
        <div v-if="show_empty_string && !isLoading && !data.length" class="col-12 text-center">
            <span>{{ __('No property found') }}!</span>
        </div>
        <div class="col-sm-4 col-md-3 colm10" v-for="item in data" :key="item.id" v-if="!isLoading && data.length">
            <div class="hourseitem">
                <div class="blii">
                    <div class="img"><img class="thumb" :data-src="item.image" :src="item.image" :alt="item.name">
                    </div>
                    <a :href="item.url" class="linkdetail"></a>
                    <div class="status" v-html="$sanitize(item.status_html, {allowedTags: ['span'], allowedAttributes: {'span': ['class']}})"></div>
                </div>
                <div class="info">
                    <h3><a :href="item.url">{{ item.name }}</a></h3>
                    <p class="city"><i class="fas fa-map-marker-alt" style="opacity: 0.7"></i>  {{ item.location }} - <i class="fa fa-eye"></i> {{item.views}} </p>
                    <p class="bold500">{{ __('Price') }}: {{ item.price }} </p>
                    <p class="threemt bold500">
                        <span data-toggle="tooltip" data-placement="top" :data-original-title="__('Number of rooms')" v-if="item.number_bedroom"> <i><img :src="themeUrl('images/bed.svg')" alt="icon"></i> <i class="vti">{{ item.number_bedroom }}</i> </span>
                        <span data-toggle="tooltip" data-placement="top" :data-original-title="__('Number of rest rooms')" v-if="item.number_bathroom">  <i><img :src="themeUrl('images/bath.svg')" alt="icon"></i> <i class="vti">{{ item.number_bathroom }}</i></span>
                        <span data-toggle="tooltip" data-placement="top" :data-original-title="__('Square')" v-if="item.square"> <i><img :src="themeUrl('images/area.svg')" alt="icon"></i> <i class="vti">{{ item.square }} {{item.size_type }}</i> </span>
                    </p>

                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {

        data: function() {
            return {
                isLoading: true,
                data: []
            };
        },

        mounted() {
            var currentUrl = window.location.pathname;

            console.log('currentUrl');
            console.log(currentUrl);
            console.log(encodeURIComponent(currentUrl));

            this.getProperties();
        },

        props: {
            url: {
                type: String,
                default: () => null,
                required: true
            },
            type: {
                type: String,
                default: () => 'rent',
            },
            property_id: {
                type: Number,
                default: () => null,
            },
            project_id: {
                type: Number,
                default: () => null,
            },
            show_empty_string: {
                type: Boolean,
                default: () => false
            },
        },

        methods: {
            getProperties() {
                this.data = [];
                this.isLoading = true;
                let url = this.url + '?type=' + this.type;

                if (this.property_id) {
                    url += '&property_id=' + this.property_id;
                }

                if (this.project_id) {
                    url += '&project_id=' + this.project_id;
                }

                axios.get(url)
                    .then(res => {
                        this.data = res.data.data;
                        this.isLoading = false;
                    });
            },
        }
    }
</script>
