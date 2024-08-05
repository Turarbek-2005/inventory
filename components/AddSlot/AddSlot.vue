<script setup lang="ts">
import { useMutation, useQuery } from "@tanstack/vue-query";
import { uuid } from "vue-uuid";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { COLLECTION_OBJECTS, DB_ID, STORAGE_ID } from "~/app.constants";
import { useSlotsQuery } from "../Slots/useSlotsQuery";

const { refetch } = useSlotsQuery();

function useFreeSlotsQuery() {
  return useQuery({
    queryKey: ["objects"],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_OBJECTS),
    select(data) {
      return data.documents;
    },
  });
}
const Slots = useFreeSlotsQuery();
const occupiedSlots = Slots.data.value?.map((item) => parseInt(item.slot));
const allSlots = Array.from({ length: 25 }, (_, i) => i + 1);

const freeSlots = allSlots.filter((slot) => !occupiedSlots?.includes(slot));

console.log(freeSlots);

const photo = ref("");
const name = ref("");
const description = ref("");

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

function addPhoto(e: InputFileEvent) {
  if (e.target?.files && e.target.files.length > 0) {
    uploadImage(e.target.files[0]);
  }
}

const { mutate: createObject } = useMutation({
  mutationKey: ["create a new Object"],
  mutationFn: async (data) => {
    const formattedData = {
      name: name.value ? name.value : false,
      description: description.value ? description.value : false,
      image: photo.value ? photo.value : false,
      slot: freeSlots[0].toString(),
      quantity: "0",
    };

    console.log("Formatted Data:", formattedData);

    return await DB.createDocument(
      DB_ID,
      COLLECTION_OBJECTS,
      uuid.v4(),
      formattedData
    );
  },
  onSuccess() {
    toast("Товар успешно добавлен в инвентарь", {
      theme: "auto",
      dangerouslyHTMLString: true,
    });
    refetch();
    photo.value = "";
  },
  onError() {
    toast("Товар не удалось добавить, проверьте что все поля заполнены", {
      theme: "auto",
      dangerouslyHTMLString: true,
    });
  },
});

const { mutate: uploadImage } = useMutation({
  mutationKey: ["upload images"],
  mutationFn: async (file: File) => {
    return await storage.createFile(STORAGE_ID, uuid.v4(), file);
  },
  onSuccess(data) {
    const fileUrl = storage.getFileView(STORAGE_ID, data.$id).href;
    photo.value = fileUrl;
    console.log("File uploaded successfully", data);
  },
  onError(error) {
    console.error("File upload failed", error);
  },
});

async function create() {
  try {
    if (photo.value.length > 0) {
      createObject();
    } else {
      console.log("No photos to upload");
    }
  } catch (error) {
    console.error(
      "Ошибка при загрузке изображений или создании товара:",
      error
    );
  }
}
</script>
<template>
  <div class="add">
    <div v-if="!photo" class="skeleton">Выберите фото снизу</div>
    <NuxtImg v-else class="photo" :src="photo" />
    <input type="file" class="add__photo" :onchange="addPhoto" />
    <input
      type="text"
      class="name"
      placeholder="Введите название товара"
      v-model="name"
    />
    <textarea
      type="text"
      class="description"
      placeholder="Введите описание товара"
      v-model="description"
    />
    <button @click="create" class="create">Добавить</button>
  </div>
</template>
<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";
.add {
  height: 38rem;
  background-color: $bgColor;
  border-radius: 12px;
  border: 1px solid $borderColor;
  padding: 1.5rem;
  &__photo {
    height: 3rem;
    margin-top: 1rem;
  }
}
.skeleton {
  width: 100%;
  height: 17rem;
  background-color: $borderColor;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo {
  width: 100%;
  height: 17rem;
}

.name {
  width: 100%;
  height: 2rem;
  background-color: $bgColor;
  border-radius: 4px;
  border: 1px solid $borderColor;
  padding-left: 1rem;
  margin-bottom: 1rem;
  outline: none;
  color: rgba($color: #fff, $alpha: 0.6);
}
.description {
  width: 100%;
  height: 5rem;
  background-color: $bgColor;
  border-radius: 4px;
  border: 1px solid $borderColor;
  padding-left: 1rem;
  padding-top: 0.5rem;
  resize: none;
  outline: none;
  color: rgba($color: #fff, $alpha: 0.6);
}

.create {
  width: 80%;
  height: 3rem;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  cursor: pointer;
}
</style>
